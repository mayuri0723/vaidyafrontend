import React from 'react'
import '../medicinecards.css'

function MedicineCards() {
    return (
        <div>
            <div className="pa-medicine spacer-top spacer-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="pa-medicine-box" style={{padding: "41px"}}>
                                <div className="pa-medi-icon">
                                    <img src={"images/acupuncture.png"} />
                                </div>
                                <h2>अग्निकर्म </h2>
                                {/* <a href="#">Pure Ayurveda</a> */}
                                <p>इस चिकित्सा पद्धती में सोने कि काडी से त्वचा पर सेक दिया जाता है|</p>
                                <p>यह 5००० वर्ष पुराणी शास्त्रीय आयुर्वेद चिकित्सा पद्धती है |</p>
                                <p>यह नस का दब जाना, करोडरज्जू के विकार, वात के विकार, सभी प्रकार का दर्द, संधिवात जैसे व्याधी मी लाभदायी उपचार पद्धती है|</p>
                                <p>

                                </p>
                                <p></p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="pa-medicine-box">
                                <div className="pa-medi-icon">
                                <img src={"images/acupunture2.png"} />
                                </div>
                                <h2>विद्धकर्म</h2>
                                {/* <a href="#">Herbal Medicine</a> */}
                                <p>यह उपचार पद्धती से रक्तप्रवाह सरल किया जाता है| </p>
                                <p>
                                    यह संपूर्ण से आयुर्वेद उपचार पध्दती है| शरीरपर विशिष्ट स्थानोंपर विद्ध्कर्म करने से विकार मिटते है|
                                </p>
                                <p>विद्धकर्म याने अक्यूपंक्चर नही|</p>
                                <p>
                                    संपूर्ण शरीर में १०८ विशिष्ट जगह है, जहां पे हर एक अवयव का नियंत्रण होता है| उसे मर्म कहा जाता है|
                                </p>
                                <p>इस चिकित्सा पध्दती में उन जागाह का प्रयोग होता है|</p>
                                <p>यह मानसिक विकारोंमे अत्यंत लाभदायी चिकित्सा पध्दती है|  </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="pa-medicine-box">
                                <div className="pa-medi-icon">
                                <img src={"images/panchkarma2.png"} />
                                </div>
                                <h2>पंचकर्म</h2>
                            
                                <p>पंचकर्म आयुर्वेद चिकित्सा पद्धति की विशिष्टता है जो किसी चिकिंत्सा पद्धति में नहीं है अनेक जटिल एंव असाध्य व्याधियां जो केवल औषधोपचार से उपचारित नहीं हो पाती, वे पंचकर्म से सहजता से ठीक की जा सकती है।  </p>
                                    <p>इस चिकित्सा में प्रमुख रूप से स्नेहन, स्वेदन, वमन, विरेचन, वस्ति, नस्य व रक्त मोक्षण आदि क्रिया-कलापों के माध्यम से शरीर व मन में स्थित विकृत दोषों को बाहर निकाला जाता है। जिससे दुबारा रोगों की उत्पति न हो।</p>

                           
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MedicineCards