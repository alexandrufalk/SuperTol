import React, { useCallback, useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { LoginSocialGoogle } from "reactjs-social-login";
import { GoogleLoginButton } from "react-social-login-buttons";
import User from "./User.tsx";

const GoogleLoginB = () => {
  const responseGoogle = (response) => {
    console.log("responseGoogle:", response);
  };

  const errorMessage = (error) => {
    console.log("responseGoogle: errorMessage", error);
  };

  const testid = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const [provider, setProvider] = useState("");
  const [profile, setProfile] = useState();
  console.log("Google profile", profile);

  const [userDetails, setUserDetails] = useState(null);

  const onLoginStart = useCallback(() => {
    alert("login start");
  }, []);

  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setProvider("");
    alert("logout success");
  }, []);

  // Load the Google API library
  useEffect(() => {
    loadGoogleAPI();
  }, []);

  const loadGoogleAPI = () => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.onload = initializeGoogleSignIn;
    document.body.appendChild(script);
  };

  // Initialize Google Sign-In
  const initializeGoogleSignIn = () => {
    window.gapi.load("auth2", () => {
      window.gapi.auth2.init({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      });
    });
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    loadGoogleAPI();
    try {
      console.log("handleGoogleLogin");
      const auth2 = window.gapi.auth2.getAuthInstance();
      const user = await auth2.signIn();

      // Get user details
      const profile = user.getBasicProfile();
      const userDetails = {
        id: profile.getId(),
        name: profile.getName(),
        email: profile.getEmail(),
        imageUrl: profile.getImageUrl(),
      };

      setUserDetails(userDetails);
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  console.log("clientId:", testid);
  return (
    <div>
      {/* <h1>{process.env.REACT_APP_GOOGLE_CLIENT_ID}</h1> */}
      <h2>Google Login</h2>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        // onFailure={responseGoogle}
        onError={errorMessage}
      />
      {provider && profile ? (
        <User
          provider={provider}
          profile={profile}
          onLogout={onLogoutSuccess}
        />
      ) : (
        <div className={`App ${provider && profile ? "hide" : ""}`}>
          <h1 className="title">Social Login</h1>
          {/* <LoginSocialFacebook
            isOnlyGetToken
            appId={process.env.REACT_APP_FB_APP_ID || ''}
            onLoginStart={onLoginStart}
            onResolve={({ provider, data }) => {
              setProvider(provider)
              setProfile(data)
            }}
            onReject={(err) => {
              console.log(err)
            }}
          >
            <FacebookLoginButton />
          </LoginSocialFacebook> */}

          <LoginSocialGoogle
            isOnlyGetToken
            client_id={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}
            onLoginStart={onLoginStart}
            onResolve={({ provider, data }) => {
              setProvider(provider);
              setProfile(data);
            }}
            onReject={(err) => {
              console.log(err);
            }}
          >
            <GoogleLoginButton />
          </LoginSocialGoogle>
          {userDetails ? (
            <div>
              <img src={userDetails.imageUrl} alt="User" />
              <p>Name: {userDetails.name}</p>
              <p>Email: {userDetails.email}</p>
            </div>
          ) : (
            <button onClick={handleGoogleLogin}>Login with Google</button>
          )}

          {/* <LoginSocialApple
            client_id={process.env.REACT_APP_APPLE_ID || ''}
            scope={'name email'}
            redirect_uri={REDIRECT_URI}
            onLoginStart={onLoginStart}
            onResolve={({ provider, data }) => {
              setProvider(provider);
              setProfile(data);
            }}
            onReject={err => {
              console.log(err);
            }}
          >
            <AppleLoginButton />
          </LoginSocialApple>

          <LoginSocialAmazon
            isOnlyGetToken
            client_id={process.env.REACT_APP_AMAZON_APP_ID || ''}
            redirect_uri={REDIRECT_URI}
            onResolve={({ provider, data }) => {
              setProvider(provider)
              setProfile(data)
            }}
            onReject={(err) => {
              console.log(err)
            }}
            onLoginStart={onLoginStart}
          >
            <AmazonLoginButton />
          </LoginSocialAmazon>

          <LoginSocialInstagram
            isOnlyGetToken
            client_id={process.env.REACT_APP_INSTAGRAM_APP_ID || ''}
            client_secret={process.env.REACT_APP_INSTAGRAM_APP_SECRET || ''}
            redirect_uri={REDIRECT_URI}
            onLoginStart={onLoginStart}
            onResolve={({ provider, data }) => {
              setProvider(provider)
              setProfile(data)
            }}
            onReject={(err) => {
              console.log(err)
            }}
          >
            <InstagramLoginButton />
          </LoginSocialInstagram>

          <LoginSocialMicrosoft
            isOnlyGetToken
            client_id={process.env.REACT_APP_MICROSOFT_APP_ID || ''}
            redirect_uri={REDIRECT_URI}
            onLoginStart={onLoginStart}
            onResolve={({ provider, data }) => {
              setProvider(provider)
              setProfile(data)
            }}
            onReject={(err) => {
              console.log(err)
            }}
          >
            <MicrosoftLoginButton />
          </LoginSocialMicrosoft>

          <LoginSocialLinkedin
            isOnlyGetToken
            client_id={process.env.REACT_APP_LINKEDIN_APP_ID || ''}
            client_secret={process.env.REACT_APP_LINKEDIN_APP_SECRET || ''}
            redirect_uri={REDIRECT_URI}
            onLoginStart={onLoginStart}
            onResolve={({ provider, data }) => {
              setProvider(provider)
              setProfile(data)
            }}
            onReject={(err) => {
              console.log(err)
            }}
          >
            <LinkedInLoginButton />
          </LoginSocialLinkedin>

          <LoginSocialGithub
            isOnlyGetToken
            client_id={process.env.REACT_APP_GITHUB_APP_ID || ''}
            client_secret={process.env.REACT_APP_GITHUB_APP_SECRET || ''}
            redirect_uri={REDIRECT_URI}
            onLoginStart={onLoginStart}
            onResolve={({ provider, data }) => {
              setProvider(provider)
              setProfile(data)
            }}
            onReject={(err) => {
              console.log(err)
            }}
          >
            <GithubLoginButton />
          </LoginSocialGithub>

          <LoginSocialPinterest
            isOnlyGetToken
            client_id={process.env.REACT_APP_PINTEREST_APP_ID || ''}
            client_secret={process.env.REACT_APP_PINTEREST_APP_SECRET || ''}
            redirect_uri={REDIRECT_URI}
            onLoginStart={onLoginStart}
            onResolve={({ provider, data }) => {
              setProvider(provider)
              setProfile(data)
            }}
            onReject={(err) => {
              console.log(err)
            }}
            className='pinterest-btn'
          >
            <div className='content'>
              <div className='icon'>
                <PinterestLogo />
              </div>
              <span className='txt'>Login With Pinterest</span>
            </div>
          </LoginSocialPinterest>

          <LoginSocialTwitter
            isOnlyGetToken
            client_id={process.env.REACT_APP_TWITTER_V2_APP_KEY || ''}
            redirect_uri={REDIRECT_URI}
            onLoginStart={onLoginStart}
            onResolve={({ provider, data }) => {
              setProvider(provider)
              setProfile(data)
            }}
            onReject={(err) => {
              console.log(err)
            }}
          >
            <TwitterLoginButton />
          </LoginSocialTwitter>

          <LoginSocialTiktok
            client_key={process.env.REACT_APP_TIKTOK_CLIENT_KEY}
            redirect_uri={REDIRECT_URI}
            onLoginStart={onLoginStart}
            onResolve={({ provider, data }) => {
              setProvider(provider);
              setProfile(data);
            }}
            onReject={(err) => {
              console.log(err);
            }}
            className="pinterest-btn"
          >
            <div className="content">
              <div className="icon">
                <TiktokLogo />
              </div>
              <span className="txt">Login With Tiktok</span>
            </div>
          </LoginSocialTiktok> */}
        </div>
      )}
    </div>
  );
};

export default GoogleLoginB;
