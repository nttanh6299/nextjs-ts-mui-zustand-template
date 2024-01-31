export type SubCallback = (obj: any) => void;

const map: MapType = {};

export const subscribe = (name: string, listener: SubCallback): void => {
  const list: SubCallback[] = map[name];
  if (list != null) {
    list.push(listener);
  } else {
    map[name] = [listener];
  }
};

export const unSubscribe = (name: string, listener: SubCallback): void => {
  const list: SubCallback[] = map[name];
  if (list != null) {
    const index = list.indexOf(listener);
    list.splice(index, 1);
  }
};

export const notify = (name: string, obj: unknown): void => {
  const list: SubCallback[] = map[name];
  if (list != null) {
    list.forEach((listener) => {
      listener.call(null, obj);
    });
  }
};

type MapType = {
  [id: string]: SubCallback[];
};
