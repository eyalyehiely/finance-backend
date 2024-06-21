import React from 'react';

function CreditCardLogo({ cardName }) {
  const getCardLogo = (name) => {
    switch (name.toLowerCase()) {
      case 'mastercard':
        return (
          <svg className="absolute bottom-0 right-0" width="48" height="28" viewBox="2 0 48 30">
            <circle fill="#F59E0B" cx="34" cy="14" r="14" fillOpacity=".8" />
            <circle fill="#F43F5E" cx="14" cy="14" r="14" fillOpacity=".8" />
          </svg>
        );
      case 'diners':
        return (
          <svg className="absolute bottom-0 right-0" width="48" height="28" viewBox="0 0 48 28">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier"></g>
          </svg>
        );
      case 'american express':
        return (
          <svg width="40px" height="35px" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" fill="#000000">
            <path d="M0,0 L254.693878,0 L254.693878,160.344259 C255.3267,161.198982 255.762422,162.157626 256,163.39634 L256,168.36419 C255.762422,169.608049 255.3267,170.691008 254.693878,171.604678 L254.693878,256 L0,256 L0,192 L0,64 L0,0 Z" />
            <defs>
              <radialGradient cx="16.6089694%" cy="17.3718345%" fx="16.6089694%" fy="17.3718345%" r="118.520308%" id="radialGradient-3">
                <stop stopColor="#88CDE7" offset="0%" />
                <stop stopColor="#2274AD" offset="100%" />
              </radialGradient>
            </defs>
            <polygon fill="url(#radialGradient-3)" points="0 256 256 256 256 0 0 0" />
            <path d="M22.9367474,110.957581 L18.0381744,99.0628738 L13.1694447,110.957581 L22.9367474,110.957581 Z M130.730933,106.238068 C129.763156,106.788039 128.599265,106.847725 127.196627,106.847725 L118.507949,106.847725 L118.507949,100.205448 L127.311738,100.205448 C128.569422,100.205448 129.874002,100.252345 130.722406,100.712785 C131.63476,101.168962 132.214574,102.094106 132.214574,103.36458 C132.214574,104.681951 131.651814,105.709415 130.730933,106.238068 L130.730933,106.238068 Z M192.677204,110.957581 L187.748788,99.0628738 L182.850215,110.957581 L192.677204,110.957581 Z M77.2047505,123.858436 L69.876076,123.858436 L69.8334427,100.465511 L59.4777997,123.858436 L53.2021692,123.858436 L42.7911028,100.414351 L42.7911028,123.858436 L28.2488639,123.858436 L25.5118023,117.190578 L10.6199698,117.190578 L7.85732813,123.858436 L0.085266719,123.858436 L12.8710112,93.951134 L23.5080344,93.951134 L35.6628051,122.285265 L35.6628051,93.951134 L47.3486089,93.951134 L56.6938413,114.257403 L65.2972532,93.951134 L77.2047505,93.951134 L77.2047505,123.858436 Z M106.404338,123.858436 L82.5211304,123.858436 L82.5211304,93.951134 L106.404338,93.951134 L106.404338,100.205448 L89.6877981,100.205448 L89.6877981,105.572988 L105.995058,105.572988 L105.995058,111.720718 L89.6877981,111.695138 L89.6877981,117.668072 L106.404338,117.668072 L106.404338,123.858436 Z M140.088955,102.030156 C140.088955,106.758195 136.908507,109.25651 135.066746,109.994067 C136.627127,110.595198 137.953024,111.626925 138.575471,112.522225 C139.585882,113.980286 139.786258,115.344554 139.786258,117.975032 L139.786258,123.858436 L132.572694,123.858436 L132.551377,120.098173 C132.551377,118.320362 132.721911,115.728254 131.39175,114.295773 C130.347233,113.225676 128.774062,113.003982 126.19048,113.003982 L118.507949,113.003982 L118.507949,123.858436 L111.362598,123.858436 L111.362598,93.951134 L127.823338,93.951134 C131.4557,93.951134 134.158655,94.0705074 136.47791,95.4006682 C138.741741,96.7223024 140.088955,98.6791736 140.088955,102.030156 L140.088955,102.030156 Z M144.245708,123.858436 L151.540276,123.858436 L151.540276,93.9468707 L144.245708,93.9468707 L144.245708,123.858436 Z M236.167494,123.858436 L226.025018,123.858436 L212.46761,101.433289 L212.49319,123.858436 L197.929634,123.858436 L195.141412,117.190578 L180.270897,117.190578 L177.597785,123.858436 L169.228856,123.858436 C165.741448,123.858436 161.333158,123.082508 158.864687,120.562877 C156.323739,118.009139 155.040474,114.58568 155.040474,109.132873 C155.040474,104.699004 155.820665,100.648835 158.890267,97.4470695 C161.205258,95.0596014 164.816304,93.951134 169.748983,93.951134 L176.659851,93.951134 L176.659851,100.354665 L169.902464,100.354665 C167.289039,100.354665 165.801134,100.755418 164.37718,102.141002 C163.174919,103.40295 162.322252,105.781891 162.322252,108.92397 C162.322252,112.134262 162.961753,114.41941 164.308967,115.949947 C165.383327,117.122365 167.391359,117.476222 169.280016,117.476222 L172.494572,117.476222 L182.568835,93.951134 L193.827419,93.951134 L203.17835,117.476222 L215.97557,117.476222 L223.290193,93.951134 L234.490027,93.951134 L236.167494,100.722979 L225.52148,100.722979 L221.889118,106.417632 L236.167494,106.417632 L236.167494,123.858436 Z" />
          </svg>

        );
      default:
        return null; // Default case if cardName doesn't match any supported types
    }
  };

  return <div>{getCardLogo(cardName)}</div>;
}

export default CreditCardLogo;
