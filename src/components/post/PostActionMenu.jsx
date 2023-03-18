import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import DeleteDialog from "./dialog/DeleteDialog";

const PostActionMenu = ({ post }) => {
  return (
    <Menu>
      <MenuButton>
        <BsThreeDotsVertical />
      </MenuButton>
      <MenuList>
        <Link to={`/post/${post.id}`}>
          <MenuItem icon={<EditIcon />}>Edit</MenuItem>
        </Link>
        <DeleteDialog id={post.id} photo={post.photo}/>
      </MenuList>
    </Menu>
  );
};

export default PostActionMenu;
