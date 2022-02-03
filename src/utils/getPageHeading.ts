import { PageHeading } from '../types/pages';

type ItemsType = {
  type: string;
  block: {
    heading_2: {
      text: {
        text: {
          content: string;
        };
      }[];
    };
    heading_3: {
      text: {
        text: {
          content: string;
        };
      }[];
    };
  };
}[];

export const getPageHeading = (items: ItemsType) => {
  return items
    .filter((item) => item.type.match(/heading_\d/))
    .map((item) => {
      let tmp: PageHeading = {};
      if (item.type === 'heading_2') {
        tmp = { content: item.block.heading_2.text[0].text.content };
      }
      if (item.type === 'heading_3') {
        tmp.child = { content: item.block.heading_3.text[0].text.content };
      }
      return tmp;
    });
};

export default getPageHeading;
