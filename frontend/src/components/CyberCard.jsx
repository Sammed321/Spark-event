import React from 'react';

export function CyberCard({
  children,
  className = '',
  style = {},
  innerStyle = {},
  hasTab = true,
  cardRef,
  ...props
}) {
  return (
    <div
      ref={cardRef}
      className={`cyber-box ${className}`}
      style={style}
      {...props}
    >
      <div className="cyber-box-offset" aria-hidden="true" />
      {hasTab && <div className="cyber-box-tab" aria-hidden="true" />}
      <div className="cyber-box-card">
        <div className="cyber-box-inner" style={innerStyle}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default CyberCard;
