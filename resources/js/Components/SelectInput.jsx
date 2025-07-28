import {forwardRef, useRef} from 'react';

export default forwardRef(function SelectInput(
  {className = '', children, ...props},
  ref,
) {
  const input = ref ? ref : useRef(null);

  return (
    <select
      {...props}
      className={
        'border-gray-300 dark:border-gray-700 shadow-sm dark:bg-gray-300 dark:text-gray-600 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600' +
        className
      }
      ref={input}
    >
      {children}
    </select>
  );
});
