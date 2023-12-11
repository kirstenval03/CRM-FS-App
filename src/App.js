import { ColorModeContext, useMode} from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./pages/global/TopBar";
import Sidebar from "./pages/global/Sidebar";
import Dashboard from "./pages/dashboard";
// import Team from "./pages/team";
// import Contacts from "./pages/contacts";
// import Bar from "./pages/bar";
// import Form from "./pages/form";
// import Line from "./pages/line";
// import Pie from "./pages/pie";
// import FAQ from "./pages/faq";
// import Events from "./pages/events";
// import Calendar from "./pages/calendar";

function App() {
  const [theme, colorMode] = useMode();

  return ( 
  <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <div className="app">
      <Sidebar/>
      <main className="content">
        <Topbar/>

        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          {/* <Route path="/team" element={<Team/>}/> */}
          {/* <Route path="/contacts" element={<Contacts/>}/> */}
          {/* <Route path="/bar" element={<Bar/>}/> */}
          {/* <Route path="/form" element={<Form/>}/> */}
          {/* <Route path="/line" element={<Line/>}/> */}
          {/* <Route path="/pie" element={<Pie/>}/> */}
          {/* <Route path="/faq" element={<FAQ/>}/> */}
          {/* <Route path="/events" element={<Events/>}/> */}
          {/* <Route path="/calendar" element={<Calendar/>}/> */}
        </Routes>
      </main>
    </div>
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
