import { FunctionalComponent, h } from 'preact';
import makeStore from 'react-hooksack';

type Log = Record<string, number>;

const reducer = (state: Log, action: string) => {
  const count = (state[action] || 0) + 1;
  return { ...state, [action]: count };
};

const useLogStore = makeStore<Log, typeof reducer>({}, reducer);

const LogTable: FunctionalComponent = () => {
  const log = useLogStore('justState');

  return (
    <table>
      <thead>
        <tr>
          <th>Component</th>
          <th>render count</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(log)
          .sort()
          .map(name => {
            const count = log[name];
            return (
              <tr key={name}>
                <td>{name}</td>
                <td style={{ textAlign: 'right' }}>{count}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default LogTable;
export { useLogStore };
