import { useUserStore } from '@/store/dynamic/user';

const IndexPage = () => {
  const { count, increment } = useUserStore();

  return (
    <div>
      <div>Count: {count}</div>
      <button type="button" onClick={increment}>
        Increment
      </button>
    </div>
  );
};

export default IndexPage;
