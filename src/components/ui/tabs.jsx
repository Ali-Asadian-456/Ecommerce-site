import * as React from "react";

const Tabs = ({ children, value, onValueChange }) => {
  return (
    <div>
      {React.Children.map(children, (child) => {
        // فقط `TabsTrigger` ها باید `onValueChange` دریافت کنند
        if (child.type === TabsList) {
          return React.cloneElement(child, { activeValue: value, onValueChange });
        }
        return React.cloneElement(child, { activeValue: value });
      })}
    </div>
  );
};

const TabsList = ({ children, activeValue, onValueChange }) => {
  return (
    <div className="flex space-x-2">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { activeValue, onValueChange })
      )}
    </div>
  );
};

const TabsTrigger = ({ value, children, activeValue, onValueChange }) => {
  return (
    <button
      onClick={() => onValueChange && onValueChange(value)}
      className={`px-4 py-2 rounded-md cursor-pointer transition-colors ${
        activeValue === value ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
      }`}
    >
      {children}
    </button>
  );
};

const TabsContent = ({ value, activeValue, children }) => {
  return activeValue === value ? <div>{children}</div> : null;
};

export { Tabs, TabsList, TabsTrigger, TabsContent };
