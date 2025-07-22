import React from 'react';
import { Section } from '../types';

interface SidebarProps {
  sections: Section[];
  selectedSectionId: string;
  onSelectSection: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sections, selectedSectionId, onSelectSection }) => {
  return (
    <aside className="w-64 lg:w-72 bg-gray-800/30 border-r border-gray-700 flex-shrink-0 overflow-y-auto">
      <nav className="p-4">
        <ul>
          {sections.map(section => {
            if (section.isCategory) {
              return (
                <li key={section.id} className="mt-6 mb-2">
                  <h2 className="text-sm font-bold text-blue-400 uppercase tracking-wider">{section.title}</h2>
                </li>
              );
            }
            const isSelected = section.id === selectedSectionId;
            return (
              <li key={section.id}>
                <button
                  onClick={() => onSelectSection(section.id)}
                  className={`w-full text-left px-4 py-2 my-1 text-sm rounded-md transition-colors duration-200 ${
                    isSelected
                      ? 'bg-blue-600/30 text-white font-semibold'
                      : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                  }`}
                >
                  {section.title}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;