
interface ContributionCalendarHeaderProps {
  username: string;
  handleLogout: () => void;
}

const ContributionCalendarHeader = ({ username, handleLogout }: ContributionCalendarHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">
        {username}'s Contributions
      </h1>
      <button
        onClick={handleLogout}
        className="px-4 py-2 text-sm text-red-600 hover:text-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default ContributionCalendarHeader;
