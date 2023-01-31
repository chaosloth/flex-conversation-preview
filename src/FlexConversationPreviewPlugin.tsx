import React from "react";
import * as Flex from "@twilio/flex-ui";
import { FlexPlugin } from "@twilio/flex-plugin";

import { CustomizationProvider } from "@twilio-paste/core/customization";
import { ContentFragmentConditionFunction, Tab } from "@twilio/flex-ui";
import ConversationHistory from "./views/ConversationHistoryTab";

const PLUGIN_NAME = "FlexConversationPreviewPlugin";

export default class FlexConversationPreviewPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof Flex }
   */
  async init(flex: typeof Flex, manager: Flex.Manager): Promise<void> {
    // Add Paste
    flex.setProviders({
      PasteThemeProvider: CustomizationProvider,
    });

    /**************************************
     *  Check if tab should be displayed
     **************************************/
    const shouldDisplayTab: ContentFragmentConditionFunction = (props) => {
      const t = props.task;
      if (t && t.attributes?.conversationSid) return true;
      return false;
    };

    /**************************************
     *  Add the tab
     **************************************/
    flex.TaskCanvasTabs.Content.add(
      <Tab
        uniqueName="conversation-history-preview"
        key="conversation-history-preview"
        label="Conversation History"
      >
        <ConversationHistory />
      </Tab>,
      {
        sortOrder: -1,
        if: shouldDisplayTab,
      }
    );
  }
}
