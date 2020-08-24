import React from 'react';

import Directory from '../../components/directory/directory.component';

import { HomePageContainer } from './homepage.styles';

const HomePage = () => {
    return (
    <div className="homepage">
        <HomePageContainer>
            <Directory />
        </HomePageContainer>
    </div>
    );
};

export default HomePage;