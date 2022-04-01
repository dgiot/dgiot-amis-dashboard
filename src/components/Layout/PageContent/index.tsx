import React from 'react';
import { PageContext, PageContextProps } from '../PageContext';

interface PageContentProps extends PageContextProps {
}

interface PageContentState {
}

class PageContent extends React.Component<PageContentProps, PageContentState> {
  state = {};

  public render() {
    const { children, ...globalContextProps } = this.props;
    const customContextProps: Partial<PageContextProps> = {};
    return (
      <PageContext.Provider key="pageContext.Provider" value={{ ...globalContextProps, ...customContextProps }}>
        {children}
      </PageContext.Provider>
    );
  }
}

export { PageContentProps, PageContentState, PageContent };
