
import React, {useState} from 'react';
import "./Home.scss";
import iconChat from "../../assets/img/icon-chat.webp";
import inconMoney from "../../assets/img/icon-money.webp";
import iconSecurity from "../../assets/img/icon-security.webp";
import FeatureItem from '../../components/featureItems/FeatureItem';

/**
 *
 * @returns {React.ReactElement} JSX.Element - the user main page
 */


function Home(){


 
	return (
		
		
    <>
      <div className="hero" >
        <section className="hero-content">
          <h2 className="sr-only">Promoted Content</h2>
          <p className="subtitle">No fees.</p>
          <p className="subtitle">No minimum deposit.</p>
          <p className="subtitle">High interest rates.</p>
          <p className="text">Open a savings account with Argent Bank today!</p>
        </section>
      </div>
      <section className="features">
        <h2 className="sr-only">Features</h2>
       
       
       <FeatureItem icon={iconChat} title="Chat Support" alt="icon de chat" description="Get help whenever you need it."/>
       <FeatureItem icon={inconMoney} title="No Minimum Deposit" alt="icon de money"   description="Start saving with any amount." />
       <FeatureItem icon={iconSecurity} title="High Security" alt="icon de security"  description="Your money is safe and secure." />
       
      </section>
   
   </>
  );
}
export default Home;