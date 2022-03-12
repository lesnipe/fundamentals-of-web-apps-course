import Part from "./Part";

function Content ({ parts }) {
  return parts.map((part) => 
    <Part part={part} key={part.id} />
  );
}
export default Content;
