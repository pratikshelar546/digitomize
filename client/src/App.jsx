import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom"
import { UserAuthContextProvider } from "./context/UserAuthContext"
import {
    ClerkProvider,
    SignedIn,
    SignedOut,
    RedirectToSignIn,
    SignIn,
    SignUp,
    UserButton,
} from "@clerk/clerk-react";

import './App.css'
import Layout from "./components/Layout"
import UserLayout, { loader as userLayoutLoader } from "./user/UserLayout"
import Home from "./components/Home"
import Login, { loader as loginLoader } from "./components/Login"
import Signup from "./components/Signup"
import IndividualCard from "./components/IndividualCard"
import ErrorPage from "./components/error-page"
import UserDashboard from "./user/dashboard/UserDashboard"
import UserDashPersonal, { loader as userDashPersonalLoader } from "./user/dashboard/UserDashPersonal"
import UserDashRatings, { loader as userDashRatingsLoader } from "./user/dashboard/UserDashRatings"
import UserDashGithub, { loader as userDashGithubLoader } from "./user/dashboard/UserDashGithub"
import UserProfile, { loader as userProfileLoader } from "./user/Profile/UserProfile"
import ProtectedRoute from "./ProtectedRoute"
import Updates from "./components/Updates"
import NewHome from "./components/NewHome"
// import ProtectedRoute from "./ProtectedRoute"

const clerkPubKey = "pk_test_YWR2YW5jZWQtY29kLTI5LmNsZXJrLmFjY291bnRzLmRldiQ"

const router = createBrowserRouter(createRoutesFromElements(
    <Route >
        <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
            <Route index element={<Home />} />
            <Route path="login/*" element={<SignIn  />} />
            <Route path="signup/*" element={<SignUp />} />
            <Route path="contests" element={<Home />} />
            <Route path="updates" element={<Updates />} />
            <Route path="home" element={<NewHome />} />
            <Route path="contests/:vanity" element={<IndividualCard />} />
        </Route>
        <Route path="/user">
            <Route path="dashboard" element={<><SignedIn ><UserDashboard /></SignedIn><SignedOut>
                <RedirectToSignIn />
            </SignedOut></>} >
                <Route path="personal" element={<UserDashPersonal />} loader={userDashPersonalLoader} />
                <Route path="ratings" element={<UserDashRatings />} loader={userDashRatingsLoader} />
                <Route path="github" element={<UserDashGithub />} loader={userDashGithubLoader} />
            </Route>
            <Route path="profile/:username" element={<UserProfile />} loader={userProfileLoader} />
        </Route>
    </Route>
))

function App() {
    return (
        <ClerkProvider publishableKey={clerkPubKey}>
            <UserAuthContextProvider>
                <RouterProvider router={router} />
            </UserAuthContextProvider>
        </ClerkProvider>
    )
}

export default App