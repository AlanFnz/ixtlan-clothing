import React, { Profiler } from 'react';
import axios from 'axios';

import Directory from '../../components/directory/directory.component';

import { HomePageContainer } from './homepage.styles';

const HomePage = () => {
    axios({
        url: '/test',
        method: 'get',
      })
        .then(response => {
          alert(response);
        })
        .catch(error => {
          console.log(error);
        });

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