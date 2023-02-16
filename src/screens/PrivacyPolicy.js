import React, { useState } from 'react'
import { Container, Row, Card, Button } from 'react-bootstrap'


const PrivacyPolicy = ({ history }) => {
  const currentYear = new Date().getFullYear();

  return (
    <Container>
      <Card className="text-center">
        <Card.Header> 
       Privacy Policy</Card.Header>
        {/* <Card.Body>
          <Card.Title>
          <strong>  Privacy Policy for Mindvein</strong>
          </Card.Title>
          <Card.Text style={{marginTop:"-10px"}}>
            These terms and conditions outline the rules and regulations for the use of Mindvein’s Website, located at www.mindvein.com
            By accessing this website we assume you accept these terms and conditions. Do not continue to use Mindvein if you do not agree to take all of the terms and conditions stated on this page.
            The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: “Client”, “You” and “Your” refers to you, the person log on this website and compliant to the Company’s terms and conditions. “The Company”, “Ourselves”, “We”, “Our”, “Mindvein”, “Mindvein Healthcare Pvt. Ltd.” and “Us”, refers to our Company. “Party”, “Parties”, or “Us”, refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of India. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.
          </Card.Text>
          <Card.Title>
          <strong style={{lineHeight: "1.2"}}> Consent</strong>
          </Card.Title>
          <Card.Text style={{marginTop:"-12px"}}>
            By using our website, you hereby consent to our Privacy Policy and agree to its terms.
          </Card.Text>
          <Card.Title>
          <strong style={{lineHeight: "2.2"}}> Information we collect </strong>
          </Card.Title>
          <Card.Text style={{marginTop:"-12px"}}>
            The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
            If you contact us directly, we may receive additional information about you such as your name, email address, phone number, and the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
            When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.
          </Card.Text>
          <Card.Title>
          <strong style={{lineHeight: "2.2"}}>   How we use your information </strong>
          </Card.Title>
          <Card.Text style={{marginTop:"-12px"}}>
            We use the information we collect in various ways, including to:
            - Provide, operate, and maintain our website.
            - Improve, personalize, and expand our website
            - Understand and analyze how you use our website
            - Develop new products, services, features, and functionality
            - Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes
            - Send you emails
            - Find and prevent fraud
          </Card.Text>
          <Card.Title>
          <strong style={{lineHeight: "2.2"}}>  Log Files</strong>
          </Card.Title>
          <Card.Text style={{marginTop:"-12px"}}>
            Mindvein follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services’ analytics. The information collected by log files include internet protocol (IP)
 addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users’ movement on the website, and gathering demographic information.
          </Card.Text>
          <Card.Title>
          <strong style={{lineHeight: "2.2"}}>Cookies and Web Beacons</strong>
          </Card.Title>
          <Card.Text style={{marginTop:"-12px"}}>
            Like any other website, Mindvein uses ‘cookies’. These cookies are used to store information including visitors’ preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users’ experience by customizing our web page content based on visitors’ browser type and/or other information.
            For more general information on cookies, please read “What Are Cookies”.
            Our Advertising Partners
            Some of advertisers on our site may use cookies and web beacons. Our advertising partners are listed below. Each of our advertising partners has their own Privacy Policy for their policies on user data. For easier access, we hyperlinked to their Privacy Policies below
            Google https://policies.google.com/technologies/ads
          </Card.Text>
          <Card.Title>
          <strong style={{lineHeight: "2.2"}}>Advertising Partners Privacy Policies</strong>
          </Card.Title>
          <Card.Text style={{marginTop:"-12px"}}>
            You may consult this list to find the Privacy Policy for each of the advertising partners of Mindvein.
            Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Mindvein, which are sent directly to users’ browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
            Note that Mindvein has no access to or control over these cookies that are used by third-party advertisers.
          </Card.Text>
          <Card.Title>
          <strong style={{lineHeight: "2.2"}}>Third Party Privacy Policies</strong>
          </Card.Title>
          <Card.Text style={{marginTop:"-12px"}}>
            Mindvein’s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
            You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers’ respective websites.
          </Card.Text>
        </Card.Body> */}
      </Card>
    </Container>
  )
}

export default PrivacyPolicy