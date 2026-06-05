import { HiOutlineInboxStack } from 'react-icons/hi2';
import Button from './Button';

export default function EmptyState({ icon: Icon = HiOutlineInboxStack, title = 'No data found', description = 'There is nothing to display here yet.', actionLabel, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-fade-in">
      <div className="p-4 rounded-2xl bg-dark-100 dark:bg-dark-800 mb-4">
        <Icon className="w-12 h-12 text-dark-400 dark:text-dark-500" />
      </div>
      <h3 className="text-lg font-semibold text-dark-700 dark:text-dark-300 mb-1">{title}</h3>
      <p className="text-sm text-dark-500 dark:text-dark-400 max-w-sm">{description}</p>
      {actionLabel && onAction && (
        <Button className="mt-4" onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  );
}
