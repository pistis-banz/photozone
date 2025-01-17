import Header from "@/components/Header";
import PostContainer from "./components/postContainer";
import AuthProvider from "./contexts/auth.context";
import NewPost from "./pages/newPost/NewPost";

function App() {
  return (
    <AuthProvider>
      <div className="max-w-[100vw] bg-background">
        <Header />
        <main className="lg:pl-20">
          <PostContainer />
          <NewPost />
        </main>
      </div>
    </AuthProvider>
  );
}
export default App;
