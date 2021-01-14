import React, { Profiler } from 'react';
import Directory from '../../components/directory/directory.component';
// Styles
import { HomePageContainer } from './homepage.styles';

const HomePage = () => {

    return (
    <div className="homepage">
        <HomePageContainer>
            <Profiler id='Directory' onRender={(id, phase, actualDuration) => {
                console.log({
                    id,
                    phase,
                    actualDuration
                });
            }}>
            <Directory />
            </Profiler>
        </HomePageContainer>
    </div>
    );
};

export default HomePage;