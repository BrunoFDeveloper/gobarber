import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

import api from '~/services/api';

export default function AvatarPreview({ imageUrl, register }) {
  const [imagePreview, setPreview] = useState(imageUrl);

  const [avatarId, setAvatarId] = useState();

  async function handleFileChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    setAvatarId(response.data.id);
    setPreview(response.data.url);
  }

  return (
    <Container>
      <label htmlFor="avatar">
        <img src={imagePreview} alt="Profile" />
        <input
          id="avatar"
          type="file"
          onChange={handleFileChange}
          accept="image/*"
        />
        <input
          defaultValue={avatarId}
          type="text"
          name="avatar_id"
          ref={register}
        />
      </label>
    </Container>
  );
}

AvatarPreview.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
};
