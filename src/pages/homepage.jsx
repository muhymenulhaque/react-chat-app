import React from "react";
import { Link } from 'react-router-dom';

import "../styles/homepageStyles.css"

const Homepage = () => {
    

    return (
        <div id="homepage-container">
            <div id="banner-part">
                <div id="header">
                    <div id="logo">

                    </div>
                    <div id="title">
                        Chat Motel
                    </div>
                </div>

                <div id="intro">
                    <div id="catchphrase"> Chat Without Login! </div>

                    <div id="description">
                        Chat in public PC or with strangers without login. No need to give any sensitive information. 
                        Privacy is in your hands.
                    </div>

                    <br />

                    <Link to="create-link">
                        <button id="top-chatroom-btn">Let's go!</button>
                    </Link>
                </div>
            </div>

            <div id="features">
                <div id="feature1" class="feature-element">  
                    {/* simple */}
                    <div id="feature1-picture" class="feature-picture"></div>
                    <div id="feature1-text" class="feature-text">
                        Simple to use UI and design for you to not get distracted.
                    </div>
                </div>
                <div id="feature2" class="feature-element">  
                    {/* easy */}
                    <div id="feature2-picture" class="feature-picture"></div>
                    <div id="feature2-text" class="feature-text">
                        Easy and straight-forward. No time to waste.
                    </div>
                </div>
                <div id="feature3" class="feature-element">  
                    {/* fast */}
                    <div id="feature3-picture" class="feature-picture"></div>
                    <div id="feature3-text" class="feature-text">
                        Fast as you need it to be. Chat Motel is built with database hosted on the best servers.
                    </div>
                </div>
            </div>

            <div id="guide2">
                <div id="guide-text">Are you ready? </div>

                <Link to="create-link">
                    <button id="bottom-chatroom-btn">Create a chatroom</button>
                </Link>
            </div>

            <div id="footers">
                <a id="gh-project-link" href="https://github.com/romin1122/no-login-chat">
                    <img id="github-logo" src="./github-logo.png" alt="github logo" /> 
                    <span> Github project </span> 
                </a>
                <br />

                <div>
                    <span id="support-text">Support & feedback</span>: Comment in github project.
                </div>
                
            </div>
        </div>
    );
}

export default Homepage;