const ToolCard = ({ name, icon,onClick }) => {
    return (
      <div className="tool-card" onClick={onClick}>
        {icon}
        <p>{name}</p>
      </div>
    );
  };
  
  export default ToolCard;
  