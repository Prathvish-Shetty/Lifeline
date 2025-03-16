const StatusBadge = ({ status }) => {
  const statusClasses = {
    Pending: "badge badge-warning",
    Completed: "badge badge-success",
    Confirmed: "badge badge-accent",
    Rejected: "badge badge-error"
  };

  return <span className={statusClasses[status] || "badge"}>{status}</span>;
};

export { StatusBadge }