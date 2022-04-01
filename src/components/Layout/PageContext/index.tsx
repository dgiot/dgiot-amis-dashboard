import React from 'react';

/** 全局参数 */
interface PageContextProps {
}

const PageContext: React.Context<PageContextProps> = React.createContext<PageContextProps>({});

export { PageContextProps, PageContext };
