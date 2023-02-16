import React from 'react';
import "../spinner.css";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

function LoadingSpinner() {
    return (
        <div>
            <div className="no-freeze-spinner">
                <div id="no-freeze-spinner">
                    <div>
                    <i className="material-icons bi bi-bag-plus-fill"></i>
                    <i className="bi bi-heart-pulse-fill"></i>
                    <i className="bi bi-hospital"></i>
                    {/* <i className="bi bi-prescription2"></i> */}
                        <div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoadingSpinner