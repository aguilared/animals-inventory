type AuxProps = {
  children?: JSX.Element[] | JSX.Element;
};
// function Container({ children }: Props) {
const Container = ({ children }: AuxProps): JSX.Element => (
  <div className="container items-center m-auto px-1">{children}</div>
);

export default Container;
