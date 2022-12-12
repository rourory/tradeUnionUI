import AboutIcon from "./AboutIcon";
import HomeIcon from "./HomeIcon";
import LoadingIcon from "./LoadingIcon";
import PeopleIcon from "./PeopleIcon";
import UnionIcon from "./UnionIcon";
import CrossIcon from "./CrossIcon"
import AddIcon from "./AddIcon";
import CorporateIcon from "./CorporateIcon";

const getIconByname = (name: string): React.FC => {
  switch (name) {
    case 'loading': return LoadingIcon;
    case 'union': return UnionIcon;
    case 'people': return PeopleIcon;
    case 'home': return HomeIcon;
    case 'about': return AboutIcon;
    case 'cross': return CrossIcon;
    case 'add': return AddIcon;
    case 'corporate': return CorporateIcon;

    default: return CrossIcon;
  }

}

export default getIconByname;