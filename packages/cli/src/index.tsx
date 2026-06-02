import { createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";
import { Header } from "./components/header";
import InputBar from "./components/input-bar";

function App() {
    return (
        <box
            alignItems="center"
            justifyContent="center"
            backgroundColor="#000000"
            width="100%"
            height="100%"
            gap={2}
        >
            <Header />
            <box width={80}>
                <InputBar onSubmit={() => {}} />
            </box>
        </box>
    );
}

const renderer = await createCliRenderer();
createRoot(renderer).render(<App />);
