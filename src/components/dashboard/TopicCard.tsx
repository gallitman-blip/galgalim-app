'use client';

import type { Topic } from '@/types/question';
import Icon, { TOPIC_ICON } from '@/components/ui/Icon';

interface TopicCardProps {
  topic: Topic;
  selected: boolean;
  selectionMode: 'single' | 'multi';
  onToggle: (topicId: string) => void;
}

export default function TopicCard({ topic, selected, selectionMode, onToggle }: TopicCardProps) {
  const iconName = TOPIC_ICON[topic.id] ?? 'road';

  return (
    <button
      onClick={() => onToggle(topic.id)}
      className={[
        'topic-card text-right w-full rounded-2xl border-2 transition-all cursor-pointer overflow-hidden',
        selected
          ? 'border-[#2DAE94] bg-white'
          : 'border-[#C8E8E3] bg-white hover:border-[#2DAE94]',
      ].join(' ')}
      style={selected ? { boxShadow: '0 0 0 3px rgba(45,174,148,0.15)' } : {}}
    >
      {/* Top accent bar when selected */}
      {selected && (
        <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #2DAE94, #1A8A72)' }} />
      )}

      <div className="p-4">
        {/* Icon + selection indicator */}
        <div className="flex items-center justify-between mb-3">
          <div
            className={[
              'w-10 h-10 rounded-xl flex items-center justify-center transition-all',
              selected ? 'bg-[#2DAE94] text-white' : 'bg-[#E8F8F4] text-[#2DAE94]',
            ].join(' ')}
          >
            <Icon name={iconName} size={20} strokeWidth={1.75} />
          </div>

          {/* Check / radio indicator */}
          <div
            className={[
              'w-5 h-5 flex items-center justify-center transition-all border-2',
              selectionMode === 'multi' ? 'rounded-md' : 'rounded-full',
              selected
                ? 'bg-[#2DAE94] border-[#2DAE94]'
                : 'bg-white border-[#C8E8E3]',
            ].join(' ')}
          >
            {selected && (
              <Icon name="check" size={11} strokeWidth={2.5} className="text-white" />
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#E8F8F4] mb-3" />

        {/* Topic name + count */}
        <div className={`font-600 text-sm leading-snug mb-1 ${selected ? 'text-[#1A8A72]' : 'text-[#1C3A35]'}`}>
          {topic.name}
        </div>
        <div className="text-xs text-[#8AAFA8]">{topic.questionCount} שאלות</div>
      </div>
    </button>
  );
}
