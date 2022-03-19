

export type PaddingValue = {
  top: string;
  right: string;
  bottom: string;
  left: string;
};

export const parsePaddingValue = (val: string): PaddingValue => {
  if (!val) {
    return {
      top: "0px",
      right: "0px",
      bottom: "0px",
      left: "0px"
    };
  }

  const splatted = val.trim().split(/\s+/g).slice(0, 4);

  switch (splatted.length) {
    case 1: {
      return {
        top: splatted[0],
        right: splatted[0],
        bottom: splatted[0],
        left: splatted[0]
      };
    }
    case 2: {
      return {
        top: splatted[0],
        right: splatted[1],
        bottom: splatted[0],
        left: splatted[1]
      };
    }
    case 3: {
      return {
        top: splatted[0],
        right: splatted[1],
        bottom: splatted[2],
        left: splatted[1]
      };
    }
    case 4: {
      return {
        top: splatted[0],
        right: splatted[1],
        bottom: splatted[2],
        left: splatted[3]
      };
    }
  }
};