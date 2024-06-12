// pages/index.js
import EditorPage from "./components/EditorPage.jsx";

const Home = () => {
  return (
    <div className="bg-gray-50 pb-12">
      <div>
        <div className="container mx-auto px-4 pt-6 text-center">
          <div className="mb-4">
            <h1 className="text-5xl font-semibold font-robotoSlab text-gray-800">
              Today I Learn
            </h1>
            <a
              href="/table-of-contents"
              className="text-blue-500 hover:text-blue-700 mt-2 inline-block"
            >
              Go to all the notes
            </a>
          </div>
        </div>
        <div>
          <EditorPage></EditorPage>
        </div>
      </div>
    </div>
  );
};

export default Home;
