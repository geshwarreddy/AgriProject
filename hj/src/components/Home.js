import React from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import banner from "../assets/banner.mp4";
import volunteerimg from '../assets/pexels-rdne-6646852.jpg';
export default function Home() {
  return (
    <div>
      <div className="home-main">
        <h1 id="home-heading">
          Empower Your Future with{" "}
          <span className="home-special-text-1 animate__animated animate__heartBeat">Sustainale Farming Skills</span>
        </h1>
        <div className="home-content">
          <div className="home-c1">
            <p className="home-para1">
              IFTR is dedicated to fostering communities by implementing
              programs of social and rural significance, providing
              <br />
              livelihood oppurtunities, generating income, and uplifting the
              poor through various initiatives
            </p>
            <Link to="/" id="know-more">
              Know More
            </Link>
          </div>
          <div id="banner-container">
            <video
              src={banner}
              id="banner-video"
              muted
              loop
              autoPlay
              playsInline
            ></video>
          </div>
          <div className="home-c2">
            <div className="home-c2-p1">
              <h1 id="home-heading1">
                Empowering{" "}
                <span className="home-special-text-1">Communities,</span> <br />{" "}
                Sustaining <span className="home-special-text-1">Futures</span>
              </h1>
              <p>
                IFTR fosters self-sustaining communities through programs that
                provide livelihoods, generate income, and uplift the poor. By
                integrating traditional knowledge with scientific advancements,
                IFTR aims to enhance quality of life and promote sustainable
                happiness.
              </p>
            </div>
            <div className="home-c2-p2">
              <h1>Batch-22</h1>
            </div>
          </div>
          <div className="home-c3">
            <h1>
              Know about IFTR's{" "}
              <span className="home-special-text-1">Programs</span>
            </h1>
            <p className="home-para1">
              Strengthening communities through sustainable farming practices.
            </p>
            <div className="home-c3-cards">
              <div className="home-c3-card">
                <div className="home-c3-card-content">
                  <h4>Eco-Conscious Farming</h4>
                  <br />
                  <p>Get to know about Eco-Conscious Farming</p>
                </div>
                <div className="home-c3-card-footer"></div>
              </div>
              <div className="home-c3-card">
                <div className="home-c3-card-content">
                  <h4>Agriculture Input Preparation </h4>
                  <br />
                  <p>Get to know about Agriculture input preparation</p>
                </div>
                <div className="home-c3-card-footer"></div>
              </div>
              <div className="home-c3-card">
                <div className="home-c3-card-content">
                  <h4>Agricultural Engineering</h4>
                  <br />
                  <p>Get to know about Agricultural Engineering</p>
                </div>
                <div className="home-c3-card-footer"></div>
              </div>
            </div>
          </div>
          <div className="home-c4">
            <div className="home-c4-p1">
              <div className="home-c4-image">
                <img src={volunteerimg} alt="image"/>
              </div>
            </div>
            <div className="home-c4-p2">
              <h1>Become a <span className="home-special-text-1">Volunteer</span> </h1>
              <p>Join IFTR as a Volunteer and help for the welfare of the farmers</p>
              <Link to="/" >Start your journey with us today →</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
