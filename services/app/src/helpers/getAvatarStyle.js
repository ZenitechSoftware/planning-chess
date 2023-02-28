import { useChessBoardContext } from "../contexts/ChessBoardContext";
import { rgbToColor } from "./rgbToColor";
import { avatarFontSizeMap } from "./getAvatarProperties";

export const getAvatarStyle = (id, bordered, size) => {
  const { findUserById } = useChessBoardContext();
  const user = findUserById(id);

  if (!user) {
    return {
      color: 'var(--primary)',
      border: '1px solid var(--primary)', 
      backgroundColor: 'var(--background)',
    }
  }

  const defaultAvatarBorder = bordered 
    ? `1px solid ${rgbToColor(user.color.text)}` 
    : `1px solid ${rgbToColor(user.color.background)}`;

  return {
    color: rgbToColor(user.color.text),
    backgroundColor: rgbToColor(user.color.background),
    border: `${defaultAvatarBorder}`,
    fontSize: avatarFontSizeMap[size],
  }
}

export const getCustomAvatarStyle = () => ({ 
  border: '1px solid var(--primary)' ,
  backgroundColor: 'var(--background)',
})