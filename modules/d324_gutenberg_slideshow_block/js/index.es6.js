const {blocks, data, element, components, editor} = wp;
const {registerBlockType} = blocks;
const {dispatch, select} = data;
const {Fragment} = element;
const {PanelBody, Button, BaseControl, Icon, RangeControl, IconButton, Toolbar, SelectControl} = components;
const {InnerBlocks, RichText, InspectorControls, PanelColorSettings, MediaUpload, BlockControls} = editor;
const __ = Drupal.t;

const settings = {
  title: __('D324 Gutenberg Slideshow Block'),
  description: __('D324 Gutenberg Slideshow Block'),
  icon: 'welcome-learn-more',
  attributes: {
    title: {
      type: 'string',
    },
    images: {
      type: 'array',
    }
  },

  edit({className, attributes, setAttributes, isSelected}) {
    const {title, images = []} = attributes;

    // This removes an image from the gallery
    const removeImage = (removeImage) => {
      //filter the images
      const newImages = images.filter( (image) => {
        //If the current image is equal to removeImage the image will be returnd
        if(image.id != removeImage.id) {
          return image;
        }
      });

      //Saves the new state
      setAttributes({
        images:newImages,
      });
    };

    //Displays the images
    const displayImages = (images) => {
      return (
        //Loops through the images
        images.map( (image) => {
          return (
            <div className="gallery-item-container">
              <img className='gallery-item' src={image.url} key={ images.id } />
              <div className='remove-item' onClick={() => removeImage(image)}><span class="dashicons dashicons-trash"></span></div>
              <div className='caption-text'>{image.caption[0]}</div>
            </div>
          )
        })

      )
    };

    //JSX to return
    return (
      <div>
        <RichText
          identifier="title"
          tagName="h2"
          value={title}
          placeholder={__('Title')}
          onChange={nextTitle => {
            setAttributes({
              title: nextTitle,
            });
          }}
          onSplit={() => null}
          unstableOnSplit={() => null}
        />
        <div className="gallery-grid">
          {displayImages(images)}
        </div>
        <br/>
        <MediaUpload
          onSelect={(media) => {setAttributes({images: [...images, ...media]});}}
          type="image"
          multiple={true}
          value={images}
          render={({open}) => (
            <Button className="select-images-button is-button is-default is-large" onClick={open}>
              Add images
            </Button>
          )}
        />
      </div>

    );
  },

  save({className, attributes}) {
    const {title, images = []} = attributes;

    // Displays the images
    const displayImages = (images) => {
      return (
        images.map( (image,index) => {
          return (
            <img
              className='gallery-item'
              key={images.id}
              src={image.url}
              data-slide-no={index}
              data-caption={image.caption[0]}
              alt={image.alt}
            />
          )
        })
      )
    }

    //JSX to return
    return (
      <div className={className}>
        {title && (
          <h2>{title}</h2>
        )}
        <div className="gallery-grid" data-total-slides={images.length}>{ displayImages(images) }</div>
      </div>
    );
  },
};

const category = {
  slug: 'example',
  title: __('Examples'),
};

const currentCategories = select('core/blocks')
  .getCategories()
  .filter(item => item.slug !== category.slug);
dispatch('core/blocks').setCategories([category, ...currentCategories]);

registerBlockType(`${category.slug}/d324-gutenberg-slideshow-block`, {
  category: category.slug,
  ...settings,
});
