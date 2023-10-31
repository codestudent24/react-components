import { Component, createRef } from 'react';
import { IStarship } from '../types/starship';
import getStarships from '../utils/api';
import Ship from '../components/Ship';
import { ErrorProps } from './interfaces';
import './Home.css';

class Home extends Component<
  ErrorProps,
  { loading: boolean; data: IStarship[] }
> {
  inputRef = createRef<HTMLInputElement>();

  timeoutId: number = 0;

  constructor(props: ErrorProps) {
    super(props);

    this.state = {
      loading: true,
      data: [],
    };
  }

  async componentDidMount() {
    const lastSearch = localStorage.getItem('searchKey') || '';
    if (this.inputRef.current) this.inputRef.current.value = lastSearch;
    const data = await getStarships(lastSearch);
    this.setState({ data, loading: false });
  }

  handleInputChange() {
    if (this.inputRef.current) {
      const { value } = this.inputRef.current;

      localStorage.setItem('searchKey', value);

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
          {loading && <span className="loading">loading...</span>}
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
