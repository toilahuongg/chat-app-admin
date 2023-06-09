type Card = {
  children: React.ReactNode;
  className?: string;
};
const Card: React.FC<Card> = ({ children, className }) => {
  return <div className={'bg-white rounded-xl shadow-md ' + (className || '')}>{children}</div>;
};

type CardHeader = {
  title?: string;
  action?: React.ReactNode;
  className?: string;
};
const CardHeader: React.FC<CardHeader> = ({ className, title, action }) => {
  return (
    <div className={'p-4 ' + (className || '')}>
      {(title || action) && (
        <div className="flex items-center gap-4">
          {title && <h5 className="flex-1 font-medium">{title}</h5>}
          {action && <div>{action}</div>}
        </div>
      )}
    </div>
  );
};

type CardSection = {
  children: React.ReactNode;
  title?: string;
  actions?: React.ReactNode;
  className?: string;
};
const CardSection: React.FC<CardSection> = ({ children, className, title, actions }) => {
  return (
    <div className={'p-4 ' + (className || '')}>
      {(title || actions) && (
        <div className="flex items-center gap-4 pb-4">
          {title && <h5 className="flex-1 font-medium">{title}</h5>}
          {actions && <div>{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
};
export default Object.assign(Card, { Section: CardSection, Header: CardHeader });
