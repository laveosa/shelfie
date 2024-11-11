import "@/App.scss";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import {
  Bell,
  ChevronRight,
  Home,
  Loader2,
  Search,
  User,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";

function Dashboard() {
  return null;
}

function App() {
  return (
    <div id="ApplicationNameWrapper">
      <h1>Shelfie App</h1>
      <br />
      <br />
      <SheButton loading={true}>Please wait</SheButton>
      <SheButton variant="shelfie">Shelfie</SheButton>
      <SheButton variant="destructive">destructive</SheButton>
      <SheButton variant="ghost" loading={true}>
        ghost
      </SheButton>
      <SheButton variant="link" loading={true}>
        link
      </SheButton>
      <SheButton variant="outline" loading={true} size="default">
        outline
      </SheButton>
      <SheButton variant="secondary" loading={true} size="sm">
        secondary
      </SheButton>
      <br />
      <br />
      {/*<SheButton variant="default" size="default">*/}
      {/*  <ChevronRight /> ghost*/}
      {/*</SheButton>*/}
      {/*<SheButton variant="destructive" size="sm">*/}
      {/*  <Bell /> bell*/}
      {/*</SheButton>*/}
      {/*<SheButton variant="ghost" size="icon">*/}
      {/*  <Users />*/}
      {/*</SheButton>*/}
      {/*<SheButton variant="link" size="icon">*/}
      {/*  <Search />*/}
      {/*</SheButton>*/}
      {/*<SheButton variant="outline" size="icon">*/}
      {/*  <User />*/}
      {/*</SheButton>*/}
      {/*<SheButton variant="secondary" size="icon">*/}
      {/*  <Home />*/}
      {/*</SheButton>*/}
      {/*<br />*/}
      {/*<SheButton asChild>*/}
      {/*  <div>*/}
      {/*    <a href="/">link</a>*/}
      {/*  </div>*/}
      {/*</SheButton>*/}
    </div>
  );
}

export default App;
