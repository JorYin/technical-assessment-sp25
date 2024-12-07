interface commentProps {
  name: string;
  commentText: string;
}

const Comment = ({ name, commentText }: commentProps) => {
  return (
    <div className="mt-5 rounded-lg">
      <div className="">
        <p className="text-xl font-bold">{name}</p>
      </div>
      <div className="bg-slate-100 p-2 mt-1 rounded-lg">
        <p>{commentText}</p>
      </div>
    </div>
  );
};

export default Comment;
