import Router from "./routes/Routes";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { createContext, useContext, useEffect, useReducer } from "react";
import { useLocalStorage } from "./hooks/useStorage";
import { Authentication, RefeshToken } from "./service/auth";
import { getUserProgress } from "./service/progress";
const queryClient = new QueryClient();
export const coursesContext = createContext({});

const reducer = (state: any, action: any) => {
  console.log(action);
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
      };
    case "PROGRESS":
      return {
          ...state,
          progress: action.payload.progress,
      };
    case "LOGOUT":
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
};
const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    user: {},
    progress:undefined
  });
  console.log(state);
  const [user, setUser] = useLocalStorage("user", {});

  useEffect(() => {
    // const socket = io("ws://localhost:8000");
    let intervalId: any;
    // socket.on("confirmEditPermission", (data) => {
    //   if (data.email === user.data[0].email) {
    //     handleRefreshToken();

    //   }
    // });

    const handleProtectedRequest = async () => {
      try {
        const response: any = await Authentication(user.token);
        if (response.status === 1) {
          handleRefreshToken();
        } else {
          let res:any = await getUserProgress(user.data[0]._id) 
          dispatch({
            type: "PROGRESS",
            payload: {
              ...state,
              progress: res.data,
            },
          });
          dispatch({
            type: "LOGIN",
            payload: {
              ...state,
              user: user.data,
            },
          });
        }
      } catch (error) {}
    };

    handleProtectedRequest();
    // intervalId = setInterval(() => {
    //   handleProtectedRequest();
    // }, 40000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  const handleRefreshToken = async () => {
    try {
      const response: any = await RefeshToken(user.refeshToken);
      if (response?.status === 0) {
        setUser({ ...user, token: response.accessToken });
        dispatch({
          type: "LOGIN",
          payload: {
            ...state,
            user: user.data,
          },
        });
      }
    } catch (error) {
      console.error("Refresh token error:", error);
    }
  };
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <coursesContext.Provider value={{ dispatch, state }}>
          <Router />
        </coursesContext.Provider>
      </QueryClientProvider>
    </div>
  );
};
export const useCoursesContext = () => useContext(coursesContext);
export default App;
