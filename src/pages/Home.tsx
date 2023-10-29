import { Component, createRef } from 'react';
import { IStarship } from '../types/starship';
import getStarships from '../utils/api';
import Ship from '../components/Ship';
import { ErrorProps } from './interfaces';

class Home extends Component<
  ErrorProps,
  { loading: boolean; data: IStarship[] }
> {
  inputRef = createRef<HTMLInputElement>();

  timeoutId: number = 0;

  constructor(props: ErrorProps) {
    super(props);

    this.state = {
      loading: false,
      data: [],
    };
  }

  async componentDidMount() {
    const data = await getStarships();
    this.setState({ data });
  }

  handleInputChange() {
    if (this.inputRef.current) {
      const { value } = this.inputRef.current;

      clearTimeout(this.timeoutId);

      this.timeoutId = window.setTimeout(async () => {
        this.setState({ loading: true });
        const data = await getStarships(value);
        this.setState({ data, loading: false });
      }, 700);
    }
  }

  makeError = () => {
    const { onErrorChange } = this.props;
    try {
      throw new Error('My custom Error');
    } catch {
      onErrorChange(true);
    }
  };

  render() {
    const { loading, data } = this.state;
    // const { onErrorChange } = this.props;
    return (
      <>
        <div className="search">
          <input
            type="text"
            defaultValue=""
            ref={this.inputRef}
            onChange={() => {
              this.handleInputChange();
            }}
          />
          <button
            type="button"
            className="button-search"
            onClick={() => {
              this.handleInputChange();
            }}
          >
            Search
          </button>
          <button
            type="button"
            className="button-error"
            onClick={this.makeError}
          >
            Make Error
          </button>
        </div>
        <div className="data-container">
          <span>fetched data:</span>
          {loading && <span>loading...</span>}
          {loading === false && (
            <ul>
              {data.map((elem) => {
                return <Ship item={elem} key={elem.name} />;
              })}
            </ul>
          )}
        </div>
      </>
    );
  }
}

export default Home;
