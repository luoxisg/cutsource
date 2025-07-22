import React, { useState, useEffect } from 'react';
import { DOCUMENT_DATA } from './constants';
import Sidebar from './components/Sidebar';
import ContentDisplay from './components/ContentDisplay';
import { Section } from './types';
import { LogoIcon } from './components/IconComponents';

const App: React.FC = () => {
  const [selectedSectionId, setSelectedSectionId] = useState<string>('1.1');
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);

  useEffect(() => {
    const section = DOCUMENT_DATA.find(s => s.id === selectedSectionId) ?? null;
    setSelectedSection(section);
  }, [selectedSectionId]);

  const handleSelectSection = (id: string) => {
    setSelectedSectionId(id);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-200 font-sans">
      <header className="flex items-center p-4 border-b border-gray-700 bg-gray-800/50 shadow-md flex-shrink-0">
        <LogoIcon />
        <h1 className="text-xl font-bold ml-3 text-white">Interactive Technical Specification Viewer</h1>
      </header>
      <div className="flex flex-grow overflow-hidden">
        <Sidebar
          sections={DOCUMENT_DATA}
          selectedSectionId={selectedSectionId}
          onSelectSection={handleSelectSection}
        />
        <main className="flex-grow p-4 md:p-8 overflow-y-auto">
          {selectedSection ? (
            <ContentDisplay key={selectedSection.id} section={selectedSection} />
          ) : (
             <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-400">Welcome</h2>
                    <p className="mt-2 text-gray-500">Select a section from the sidebar to begin.</p>
                </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;