from flask import Flask
app = Flask(__name__)
from js_example import views  from .cli import main
main()
import functools
import inspect
import logging
import os
import sys
import typing as t
import weakref
from collections.abc import Iterator as _abc_Iterator
from datetime import timedelta
from itertools import chain
from threading import Lock
from types import TracebackType
import click
from werkzeug.datastructures import Headers
from werkzeug.datastructures import ImmutableDict
from werkzeug.exceptions import Aborter
from werkzeug.exceptions import BadRequest
from werkzeug.exceptions import BadRequestKeyError
from werkzeug.exceptions import HTTPException
from werkzeug.exceptions import InternalServerError
from werkzeug.routing import BuildError
from werkzeug.routing import Map
from werkzeug.routing import MapAdapter
from werkzeug.routing import RequestRedirect
from werkzeug.routing import RoutingException
from werkzeug.routing import Rule
from werkzeug.serving import is_running_from_reloader
from werkzeug.urls import url_quote
from werkzeug.utils import redirect as _wz_redirect
from werkzeug.wrappers import Response as BaseResponse
from . import cli
from . import typing as ft
from .config import Config
from .config import ConfigAttribute
from .ctx import _AppCtxGlobals
from .ctx import AppContext
from .ctx import RequestContext
from .globals import _cv_app
from .globals import _cv_request
from .globals import g
from .globals import request
from .globals import request_ctx
from .globals import session
from .helpers import _split_blueprint_path
from .helpers import get_debug_flag
from .helpers import get_env
from .helpers import get_flashed_messages
from .helpers import get_load_dotenv
from .helpers import locked_cached_property
from .json.provider import DefaultJSONProvider
from .json.provider import JSONProvider
from .logging import create_logger
from .scaffold import _endpoint_from_view_func
from .scaffold import _sentinel
from .scaffold import find_package
from .scaffold import Scaffold
from .scaffold import setupmethod
from .sessions import SecureCookieSessionInterface
from .sessions import SessionInterface
from .signals import appcontext_tearing_down
from .signals import got_request_exception
from .signals import request_finished
from .signals import request_started
from .signals import request_tearing_down
from .templating import DispatchingJinjaLoader
from .templating import Environment
from .wrappers import Request
from .wrappers import Response
if t.TYPE_CHECKING:      import typing_extensions as te
from .blueprints import Blueprint
from .testing import FlaskClient
from .testing import FlaskCliRunner
T_before_first_request = t.TypeVar(
"T_before_first_request", bound=ft.BeforeFirstRequestCallable
)
T_shell_context_processor = t.TypeVar(
"T_shell_context_processor", bound=ft.ShellContextProcessorCallable
)
T_teardown = t.TypeVar("T_teardown", bound=ft.TeardownCallable)
T_template_filter = t.TypeVar("T_template_filter", bound=ft.TemplateFilterCallable)
T_template_global = t.TypeVar("T_template_global", bound=ft.TemplateGlobalCallable)
T_template_test = t.TypeVar("T_template_test", bound=ft.TemplateTestCallable)
if sys.version_info >= (3, 8):
iscoroutinefunction = inspect.iscoroutinefunction
else:
def iscoroutinefunction(func: t.Any) -> bool:
while inspect.ismethod(func):
func = func.__func__
while isinstance(func, functools.partial):
func = func.func
return inspect.iscoroutinefunction(func)
def _make_timedelta(value: t.Optional[timedelta]) -> t.Optional[timedelta]:
if value is None or isinstance(value, timedelta):
return value
return timedelta(seconds=value)
class Flask(Scaffold):
if current_app:
return current_app.config["MAX_COOKIE_SIZE"]
return super().max_cookie_size
from hello import app
