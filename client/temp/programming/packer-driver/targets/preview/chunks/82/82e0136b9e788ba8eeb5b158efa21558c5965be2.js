System.register(["cc", "cc/env"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Label, EDITOR, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _crd, ccclass, property, disallowMultiple, requireComponent, menu, L10nComponent;

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Label = _cc.Label;
    }, function (_ccEnv) {
      EDITOR = _ccEnv.EDITOR;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "64a56e3cKhJIYlOsrVQprpv", "l10n-component", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Label', 'Node']);

      ({
        ccclass,
        property,
        disallowMultiple,
        requireComponent,
        menu
      } = _decorator);

      _export("default", L10nComponent = (_dec = ccclass('L10nComponent'), _dec2 = requireComponent(Label), _dec3 = disallowMultiple(), _dec4 = menu('hidden:LocalizationEditor/L10nComponent'), _dec5 = property({
        readonly: true
      }), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = class L10nComponent extends Component {
        constructor() {
          super();
          this.label = undefined;
        }

        get string() {
          var _this$label;

          return ((_this$label = this.label) == null ? void 0 : _this$label.string) || '';
        }

        onLoad() {
          this.label = this.node.getComponent(Label);
        }

        start() {
          this.render();
        }

        render() {}

        preview(value) {
          if (this.label && EDITOR) {
            var originalString = this.label.string; // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore

            this.label._string = value;
            this.label.updateRenderData(true); // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore

            cce.Engine.repaintInEditMode(); // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore

            this.label._string = originalString;
          }
        }

      }, (_applyDecoratedDescriptor(_class2.prototype, "string", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "string"), _class2.prototype)), _class2)) || _class) || _class) || _class) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=82e0136b9e788ba8eeb5b158efa21558c5965be2.js.map