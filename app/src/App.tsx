import "./App.css";

export default function App() {
  // const [greetMsg, setGreetMsg] = useState("");
  // const [name, setName] = useState("");

  // async function greet() {
  //   // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  //   setGreetMsg(await invoke("greet", { name }));
  // }

  return (
    <html className="flex h-screen w-screen">
      <main className="flex h-screen w-screen justify-center items-center text-center content-center">
        <div>
          <p>Hello world</p>
        </div>
      </main>
    </html>
  )
}
