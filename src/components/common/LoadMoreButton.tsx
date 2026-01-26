import { Button } from 'antd';

interface LoadMoreButtonProps {
  loading: boolean;
  hasMore: boolean;
  loadMore: () => void;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ loading, hasMore, loadMore }) => {
  if (!hasMore) {
    return (
      <div style={{ textAlign: 'center', marginTop: '28px' }}>
        <p>No more products to load.</p>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '28px' }}>
      <Button size="large" onClick={loadMore} loading={loading} className='border-violet-600! text-violet-600! hover:opacity-80! font-nunito'>
        Load More
      </Button>
    </div>
  );
};

export default LoadMoreButton;
