import MainContainer from "../../../components/containers/MainContainer";

const TaskPage = () => {
  return (
    <MainContainer>
      <div className="max-w-2xl mx-auto py-10 space-y-6">
        <h2 className="text-2xl font-bold">Photo Hunt Task</h2>
        <p className="text-gray-600">
          Take a clear photo of your local market and upload it below. Make sure
          the image is well-lit and centered.
        </p>

        {/* Upload */}
        <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg flex flex-col items-center justify-center">
          <input type="file" accept="image/*" className="mb-4" />
          <button className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700">
            Upload Photo
          </button>
        </div>

        <button className="bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700 transition">
          Submit Task
        </button>
      </div>
    </MainContainer>
  );
};

export default TaskPage;
