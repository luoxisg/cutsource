import React, { useState, useCallback } from 'react';
import { Section, ContentItem } from '../types';
import { summarizeText } from '../services/geminiService';
import DataTable from './DataTable';
import { AiSparkleIcon, LoadingIcon } from './IconComponents';

interface ContentDisplayProps {
  section: Section;
}

const renderContentItem = (item: ContentItem, index: number): React.ReactNode => {
  switch (item.type) {
    case 'heading': {
      const level = (item.level || 0) + 2;
      const Tag = `h${level}`; // e.g. 'h2', 'h3'
      return React.createElement(
        Tag,
        { 
          key: index, 
          className: "text-xl font-bold mt-6 mb-3 text-gray-300 border-b border-gray-700 pb-2" 
        },
        item.text
      );
    }
    case 'paragraph':
      return <p key={index} className="my-4 text-gray-300 leading-relaxed">{item.text}</p>;
    case 'list':
      return (
        <ul key={index} className="my-4 pl-6 list-disc space-y-2 text-gray-300">
          {item.items?.map((li, i) => (
            <li key={i}>{li.split(';').map((part, partIndex) => <p key={partIndex} className="mb-1">{part.trim()}</p>)}</li>
          ))}
        </ul>
      );
    case 'table':
      return item.data ? <DataTable key={index} headers={item.data.headers} rows={item.data.rows} /> : null;
    default:
      return null;
  }
};

const ContentDisplay: React.FC<ContentDisplayProps> = ({ section }) => {
  const [summary, setSummary] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSummarize = useCallback(async () => {
    if (!section.content) return;
    setIsLoading(true);
    setError('');
    setSummary('');

    // Convert section content to a simple string for the AI
    const textToSummarize = section.content.map(item => {
      if (item.text) return item.text;
      if (item.items) return item.items.join('\n');
      return '';
    }).join('\n\n');

    try {
      const result = await summarizeText(textToSummarize);
      setSummary(result);
    } catch (e: any) {
      setError(e.message || "Failed to generate summary. Please ensure your API key is configured correctly.");
    } finally {
      setIsLoading(false);
    }
  }, [section]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 md:p-8">
        <h1 className="text-3xl font-bold mb-6 text-white border-b-2 border-blue-500 pb-3">{section.title}</h1>
        
        {section.content?.map(renderContentItem)}

        <div className="mt-8 pt-6 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-blue-400 flex items-center">
              <AiSparkleIcon className="mr-3" />
              AI-Powered Summary
            </h2>
            {!isLoading && (
              <button
                onClick={handleSummarize}
                className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center disabled:opacity-50"
                disabled={isLoading}
              >
                Generate Summary
              </button>
            )}
          </div>
          {isLoading && (
            <div className="flex items-center justify-center h-32">
                <LoadingIcon />
                <p className="ml-4 text-gray-400">Generating summary...</p>
            </div>
          )}
          {error && <div className="mt-4 p-4 bg-red-900/50 border border-red-500 text-red-300 rounded-md">{error}</div>}
          {summary && (
             <div className="mt-4 p-5 bg-gray-900/50 border-l-4 border-blue-500 rounded-r-lg">
                <div className="whitespace-pre-wrap text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: summary }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentDisplay;