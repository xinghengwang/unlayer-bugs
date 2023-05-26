import React, { Component } from "react";
import EmailEditor from "react-email-editor";

import Button from "react-bootstrap/lib/Button";
import Modal from "react-bootstrap/lib/Modal";

const STARTING_DESIGN_JSON = { body: { rows: [], values: {} } };

function AddDynamicMergeTagModal(props) {
  const { onHide, onFinish } = props;
  return (
    <Modal show onHide={onHide}>
      <Modal.Body>Add Dynamic Merge tag.</Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            const newTags = {
              NEW_TAG: {
                name: "NEW_TAG",
                value: "{{NEW_TAG}}"
              }
            };
            onFinish(newTags);
            onHide();
          }}
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default class EmailTemplates extends Component {
  constructor(props) {
    super(props);
    this.editorRef = React.createRef();
    this.handleSave = this.handleSave.bind(this);
    this.handleInitEditor = this.handleInitEditor.bind(this);
    this.handleToggleModal = this.handleToggleModal.bind(this);
    this.handleUpdateDynamicTags = this.handleUpdateDynamicTags.bind(this);
    this.state = {
      dynamicTags: {},
      showModal: false
    };
  }

  handleSave() {}

  handleToggleModal() {
    this.setState((prev) => ({
      ...prev,
      showModal: !prev.showModal
    }));
  }

  handleUpdateDynamicTags(newTags) {
    const { initialMergeTags } = this.props;
    this.setState((prev) => ({
      ...prev,
      dynamicTags: newTags
    }));

    const newMergeTags = { ...initialMergeTags, ...newTags };
    this.editorRef.current.editor.setMergeTags(newMergeTags);
  }

  handleInitEditor() {
    const { initialMergeTags } = this.props;
    const { dynamicFields } = this.state;
    if (this.editorRef.current.editor) {
      this.editorRef.current.editor.registerCallback("image", (file, done) => {
        const data = new FormData();
        data.append("file", file.attachments[0]);
        // for now just place holder image.
        done({
          url: "https://placehold.co/600x400"
        });
        // uploadImage({
        //   orgId,
        //   appId,
        //   portalBaseUrl,
        //   token,
        //   data,
        // })
        //   .then((result) => {
        //     done({
        //       url: result && result.url,
        //     });
        //   })
        //   .catch((err) => {
        //     alert('An error uploading file: ' + err);
        //   });
      });
      this.editorRef.current.editor.loadDesign(STARTING_DESIGN_JSON);
      const combinedMergeTags = { ...initialMergeTags, ...dynamicFields };
      this.editorRef.current.editor.setMergeTags(combinedMergeTags);
    }
  }

  render() {
    const { showModal } = this.state;
    return (
      <div
        style={{
          width: "800px"
        }}
      >
        <Button onClick={this.handleToggleModal}>
          Show Add Dynamic Merge Tag Modal
        </Button>

        <hr />
        <form>
          <EmailEditor
            projectId={4684}
            displayMode="email"
            minHeight={800}
            ref={this.editorRef}
            onReady={this.handleInitEditor}
            options={{
              user: null,
              safeHtml: true
            }}
          />
        </form>
        {showModal && (
          <AddDynamicMergeTagModal
            onHide={this.handleToggleModal}
            onFinish={this.handleUpdateDynamicTags}
          />
        )}
      </div>
    );
  }
}
