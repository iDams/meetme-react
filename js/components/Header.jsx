/**
 * Created by idams on 6/19/15.
 */

'use strict'

import React from 'react';

class Header extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <header>
                <nav className="row" data-topbar role="navigation">Meet Me</nav>
            </header>
        )
    }

};

export default Header;